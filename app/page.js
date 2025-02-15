'use client'

import styles from './page.module.css';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {

	const [ image, setImage ] = useState(null);
	const [ filename, setFilename ] = useState(null);
	const [ filetype, setFiletype] = useState(null);
	const [ convertToType, setConvertToType] = useState('');

	const iconSize = 100;
	const filetypes = [
		'jpeg',
		'png',
		'bmp',
		'webp'
	];

	const handleImageUpload = (event) => {
		const file = event.target.files[0]; 
		const rawType = file.type;
		setFiletype(rawType.slice(rawType.indexOf('/')+1));
		setFilename(file.name);
		if(file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result); 
			}
			reader.readAsDataURL(file);
		}
	}

	const convert = (base64) => {
		const img = new window.Image();
		img.src = base64;
		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);

		const imageUrl = canvas.toDataURL(`image/${convertToType}`);
		const downloadName = `converted.${convertToType}`;

		const link = document.createElement("a");
		link.href = imageUrl;
		link.download = downloadName;
		
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

	}

	const handleConvertTypeChange = (e) => {
		setConvertToType(e.target.value);
	}

	const InfoInterface = () => {
		if(image && filename && filetype) {
			return (
				<div className={styles.info}>
					<p className={styles.filename}>{filename}</p>
					<div className={styles.convertContainer}>
						<label className={styles.convertLabel} htmlFor='choices'>Convert to</label>
						<select id='choices' className={styles.convertMenu} name='choices' value={convertToType} onChange={handleConvertTypeChange}>
							{filetypes.map((ft) => {
								if(ft !== filetype)
									return <option value={ft} key={ft}>{ft.toUpperCase()}</option>
							})}
						</select>
					</div>
					<button className={styles.convertButton} onClick={convert}>
						<svg id='download-icon' xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M480-313 287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z"/></svg>
					</button>
				</div>
			);
		}
		return (
			<div className={styles.main}>
				Upload an image!
			</div>
		);
	}

	const UploadInterface = ({ imageSource }) => {
		return (
			<div 
				className={styles.upload}
				style={{
					backgroundImage: `url(${imageSource})`
				}}
			>
				<input id='imageInput' type='file' accept='image/*' onChange={handleImageUpload} hidden />
				{!image ? (<label htmlFor='imageInput' className={styles.inputLabel}>
					<svg xmlns="http://www.w3.org/2000/svg" height="512px" viewBox="0 -960 960 960" width="512px" fill="#FFFFFF"><path d="M479.5-267q72.5 0 121.5-49t49-121.5q0-72.5-49-121T479.5-607q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5 0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5ZM140-120q-24 0-42-18t-18-42v-513q0-23 18-41.5t42-18.5h147l73-87h240l73 87h147q23 0 41.5 18.5T880-693v513q0 24-18.5 42T820-120H140Zm0-60h680v-513H645l-73-87H388l-73 87H140v513Zm340-257Z"/></svg>
					Upload Image
				</label>) : null}
			</div>
		);
	}

	return (
		<div className={styles.page}>
			<UploadInterface imageSource={image} />
			<InfoInterface />
			<canvas id='canvas' hidden />
		</div>
	);
}
