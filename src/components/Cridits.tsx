import '../styles/Credits.css';

const Credits = () => {
	const currentYear = new Date().getFullYear();

	return (
		<div id='credits'>
			<div className='ending-credits'>
				<div>Copyright © {currentYear} Jeeann 🦕. All rights reserved.</div>
			</div>
		</div>
	);
};

export default Credits;
