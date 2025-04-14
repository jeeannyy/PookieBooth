import { useEffect, useRef } from 'react';
import '../styles/setupPage.css';

interface SetupPageProps {
	onStartCapture: () => void;
	videoStream: MediaStream | null;
	setVideoStream: (stream: MediaStream) => void;
}

const SetupPage = ({
	onStartCapture,
	videoStream,
	setVideoStream,
}: SetupPageProps) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const defaultFilter =
		'grayscale(0.1) sepia(0.6) contrast(1.15) brightness(0.9) saturate(0.6)';

	useEffect(() => {
		if (!videoStream) {
			navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
				setVideoStream(stream);
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
				onStartCapture();
			});
		} else if (videoRef.current) {
			videoRef.current.srcObject = videoStream;
			onStartCapture();
		}
	}, [videoStream]);

	return (
		<div className='setup-wrapper'>
			<video
				ref={videoRef}
				autoPlay
				playsInline
				className='setup-video'
				style={{ filter: defaultFilter }}
			/>
		</div>
	);
};

export default SetupPage;
