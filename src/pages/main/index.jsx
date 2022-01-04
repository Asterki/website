import React, { useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import $ from 'jquery';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from '../../assets/styles/main/index.module.scss';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export async function getServerSideProps({ req, res }) {
	const content = await axios({
		method: 'get',
		url: `${process.env.HOST}/api/content/language`,
		headers: req.headers,
		data: {
			category: 'main',
			page: 'index',
		},
	});

	return { props: { lang: content.data.lang } };
}

export default function Index(props) {
	// Background scene	(aka stars)
	useEffect(() => {
		$('#scene').fadeOut(0);
		$('#scene').fadeIn(5000);

		const renderer = new THREE.WebGLRenderer({ alpha: true });

		renderer.setClearColor(0x000000, 0);
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.querySelector('#scene').appendChild(renderer.domElement);

		const loader = new THREE.TextureLoader();
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);

		const light = new THREE.PointLight(0xffffff, 5, 1000, 0);
		light.position.set(0, 1000, 400);
		scene.add(light);

		camera.position.set(700, 200, 1200);
		const controls = new OrbitControls(camera, renderer.domElement);

		const vertices = [];
		for (let i = 0; i < 2000; i++) {
			const x = THREE.MathUtils.randFloatSpread(2000);
			const y = THREE.MathUtils.randFloatSpread(2000);
			const z = THREE.MathUtils.randFloatSpread(2000);

			vertices.push(x, y, z);
		}

		controls.enabled = false;
		controls.autoRotate = false;
		controls.autoRotateSpeed = 0.2;

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

		const material = new THREE.PointsMaterial({
			size: 3,
			map: loader.load('/assets/images/stars.png'),
			transparent: true,
			color: 0xc6cee1,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		camera.position.z = 5;
		controls.update();

		const animate = (time) => {
			requestAnimationFrame(animate);
			controls.update();
			TWEEN.update(time);
			renderer.render(scene, camera);
		};

		animate();

		let animateCamera = () => {
			const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
			new TWEEN.Tween(coords)
				.to({ x: Math.round(Math.random() * 1000), y: Math.round(Math.random() * 1000), z: Math.round(Math.random() * 1000) }, 15000)
				.easing(TWEEN.Easing.Quadratic.InOut)
				.onUpdate(() => camera.position.set(coords.x, coords.y, coords.z))
				.start();
		};

		animateCamera();

		setInterval(() => {
			animateCamera();
		}, 15000);
	});

	// General scripts
	useEffect(() => {
		$(`.${styles['navbar-element']}`).on('click', (e) => {
			$(`#${$(e.target).data('section')}`)
				.siblings()
				.fadeOut(500);
			setTimeout(() => {
				$(`#${$(e.target).data('section')}`).fadeIn(500);
			}, 500);
		});
	});

	return (
		<div className={styles['page']}>
			<Head>
				<title>{props.lang.pageTitle}</title>
			</Head>

			<div id="scene" className={styles['background']} />

			<Navbar collapseOnSelect expand="lg" className={styles['navbar']} variant="dark">
				<Container>
					<Navbar.Brand className={styles['navbar-title']}>
						<img alt="Icon" src="/assets/images/icon.png" width="30" height="30" className="d-inline-block align-top rounded-circle" /> Asterki Dev
					</Navbar.Brand>
					
					<Navbar.Toggle aria-controls="responsive-navbar-nav" className="shadow-none" label="Menu" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link className={`${styles['navbar-element']}`} id="home-button" data-section="home-section">
								{props.lang.home}
							</Nav.Link>
							<Nav.Link className={`${styles['navbar-element']}`} id="projects-button" data-section="projects-section">
								{props.lang.projects}
							</Nav.Link>
							<Nav.Link className={`${styles['navbar-element']}`} id="about-button" data-section="about-section">
								{props.lang.about}
							</Nav.Link>
							<Nav.Link className={`${styles['navbar-element']}`} id="contact-button" data-section="contact-section">
								{props.lang.contact}
							</Nav.Link>
							<Nav.Link className={`${styles['navbar-element']}`} id="blog-button" data-section="blog-section">
								{props.lang.blog}
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<main>
				<div id="home-section" className={`${styles['section']} ${styles['section-active']}`}>
					<h1>{props.lang.pageTitle}</h1>
					<hr />
					<p>{props.lang.description}</p>
				</div>
				<div id="projects-section" className={`${styles['section']}`}>
					<h1>{props.lang.projects}</h1>
				</div>
				<div id="about-section" className={`${styles['section']}`}>
					<h1>{props.lang.about}</h1>
				</div>
				<div id="contact-section" className={`${styles['section']}`}>
					<h1>{props.lang.contact}</h1>
				</div>
				<div id="blog-section" className={`${styles['section']}`}>
					<h1>{props.lang.blog}</h1>
				</div>
			</main>
		</div>
	);
}
