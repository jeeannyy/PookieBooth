import { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import SetupPage from './components/SetupPage';
import CapturingPage from './components/CapturingPage';
import PreviewPage from './components/PreviewPage';
import './styles/global.css';

function App() {
	const [step, setStep] = useState<'intro' | 'setup' | 'capturing' | 'preview'>(
		'intro',
	);
	const [capturedImages, setCapturedImages] = useState<string[]>([]);
	const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

	return (
		<div className='app'>
			{step === 'intro' && <WelcomePage onStart={() => setStep('setup')} />}
			{step === 'setup' && (
				<SetupPage
					onStartCapture={() => setStep('capturing')}
					videoStream={videoStream}
					setVideoStream={setVideoStream}
				/>
			)}
			{step === 'capturing' && (
				<CapturingPage
					stream={videoStream}
					onComplete={(images) => {
						setCapturedImages(images);
						setStep('preview');
					}}
				/>
			)}
			{step === 'preview' && (
				<PreviewPage
					images={capturedImages}
					sticker={''}
					onReset={() => setStep('intro')}
				/>
			)}
		</div>
	);
}

export default App;
