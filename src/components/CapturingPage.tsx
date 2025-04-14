import { useEffect, useRef, useState } from 'react';
import '../styles/capturingPage.css';

interface CapturingPageProps {
	stream: MediaStream | null;
	onComplete: (images: string[]) => void;
}

const CapturingPage = ({ stream, onComplete }: CapturingPageProps) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [captured, setCaptured] = useState<string[]>([]);
	const [dotStep, setDotStep] = useState(0);
	const [statusText, setStatusText] = useState(
		'Get ready for the first photo...',
	);
	const countdownRef = useRef<NodeJS.Timeout | null>(null);
	const defaultFilter = 'grayscale(0.9) contrast(1.3) brightness(0.8)';

	useEffect(() => {
		document.body.style.background = '#53473f';
		return () => {
			document.body.style.background = '';
		};
	}, []);

	useEffect(() => {
		if (stream && videoRef.current) {
			videoRef.current.srcObject = stream;
			videoRef.current.onloadedmetadata = () => {
				videoRef.current?.play();
			};
		}
	}, [stream]);

	useEffect(() => {
		if (!stream || captured.length > 0) return;
		startNextCountdown(0);
		return () => {
			if (countdownRef.current) clearInterval(countdownRef.current);
		};
	}, [stream]);

	const startNextCountdown = (nextShot: number) => {
		if (nextShot >= 3) return;
		let count = 0;
		setDotStep(count);
		updateStatusText(nextShot);
		if (countdownRef.current) clearInterval(countdownRef.current);
		countdownRef.current = setInterval(() => {
			count++;
			setDotStep(count);
			if (count >= 3) {
				clearInterval(countdownRef.current!);
				captureImage(nextShot);
			}
		}, 1000);
	};

	const updateStatusText = (shot: number) => {
		const texts = [
			'Get ready for the first photo...',
			'Get ready for the second photo...',
			'Get ready for the third photo...',
		];
		setStatusText(texts[shot] || '');
	};

	const captureImage = (shot: number) => {
		if (!canvasRef.current || !videoRef.current || captured.length >= 3) return;
		const ctx = canvasRef.current.getContext('2d');
		if (!ctx) return;

		canvasRef.current.width = videoRef.current.videoWidth;
		canvasRef.current.height = videoRef.current.videoHeight;
		ctx.filter = defaultFilter;
		ctx.drawImage(videoRef.current, 0, 0);
		const imageData = canvasRef.current.toDataURL('image/png');

		setCaptured((prev) => {
			const updated = [...prev, imageData];
			if (updated.length < 3) {
				setTimeout(() => startNextCountdown(updated.length), 500);
			} else {
				setTimeout(() => onComplete(updated), 500);
			}
			return updated;
		});
	};

	return (
		<div className='capturing-wrapper'>
			<div className='video-frame'>
				<video
					ref={videoRef}
					autoPlay
					playsInline
					className='capturing-video'
					style={{ filter: defaultFilter }}
				/>
				<div className='overlay'>
					<div className='status-text'>{statusText}</div>
					<div className='step-indicator'>
						{[0, 1, 2].map((i) => (
							<span
								key={i}
								className={`step-dot ${i < dotStep ? 'active' : ''}`}
							/>
						))}
					</div>
				</div>
			</div>
			<canvas ref={canvasRef} style={{ display: 'none' }} />
		</div>
	);
};

export default CapturingPage;
