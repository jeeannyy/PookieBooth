import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import '../styles/previewPage.css';

interface PreviewPageProps {
	images: string[];
	sticker: string;
	onReset: () => void;
}

const PreviewPage = ({ images, sticker, onReset }: PreviewPageProps) => {
	const [stripColor, setStripColor] = useState('#212121');
	const colors = [
		{ name: 'White', value: '#ffffff' },
		{ name: 'Pink', value: '#c29eb8' },
		{ name: 'Beige', value: '#c2af9e' },
		{ name: 'Green', value: '#a6c29e' },
		{ name: 'Blue', value: '#9ec2be' },
		{ name: 'Black', value: '#212121' },
	];

	const downloadStrip = async () => {
		const stripElement = document.getElementById('strip');
		if (!stripElement) return;
		const canvas = await html2canvas(stripElement);
		const link = document.createElement('a');
		link.download = 'PookieBooth.png';
		link.href = canvas.toDataURL();
		link.click();
	};

	useEffect(() => {
		document.body.style.background = '#8c7260';
		return () => {
			document.body.style.background = '';
		};
	}, []);

	return (
		<div className='preview-scroll'>
			<div className='preview-wrapper'>
				<h2>Photo Strip Preview</h2>

				<div className='color-options'>
					{colors.map((color) => (
						<button
							key={color.value}
							onClick={() => setStripColor(color.value)}
							style={{
								backgroundColor: color.value,
								color: color.value === '#212121' ? 'white' : 'black',
							}}
						></button>
					))}
				</div>

				<div
					id='strip'
					className='strip-container'
					style={{ background: stripColor }}
				>
					{images.map((src, i) => (
						<div key={i} className='strip-image-wrapper'>
							<img src={src} alt={`preview-${i}`} width={200} />
							{sticker && <span className='sticker'>{sticker}</span>}
						</div>
					))}
				</div>

				<button onClick={downloadStrip} className='preview-button'>
					Download Photo
				</button>
				<button onClick={onReset} className='preview-button'>
					Retake
				</button>
			</div>{' '}
		</div>
	);
};

export default PreviewPage;
