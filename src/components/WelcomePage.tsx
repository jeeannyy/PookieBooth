import { useEffect } from 'react';
import '../styles/welcomePage.css';

interface WelcomePageProps {
	onStart: () => void;
}

const WelcomePage = ({ onStart }: WelcomePageProps) => {
	useEffect(() => {
		document.body.style.background = '#8c7260';
		return () => {
			document.body.style.background = '';
		};
	}, []);

	return (
		<div className='welcome-wrapper'>
			<img
				src='/2pookie.jpg'
				alt='Pookie Booth Logo'
				className='welcome-logo'
			/>
			<h1>PookieBooth</h1>
			<button onClick={onStart} className='start-button'>
				START
			</button>
		</div>
	);
};

export default WelcomePage;
