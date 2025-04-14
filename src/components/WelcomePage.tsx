import { useEffect } from 'react';
import '../styles/welcomePage.css';
import Credits from './Cridits';

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
			<div className='main-content'>
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

			<div className='credits-wrapper'>
				<Credits />
			</div>
		</div>
	);
};

export default WelcomePage;
