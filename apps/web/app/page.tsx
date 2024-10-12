import Buttont from "./_component/Buttont";
import Children from "./_component/Children";
import IsClicked from "./_component/IsClicked";
import Wrapper from "./_component/Wrapper";

declare global {
	interface Window {
		ReactNativeWebView: {
			postMessage: (message: string) => void;
		};
	}
}

export default function Web() {
	return (
		<div>
			<h1>Web</h1>
			<Buttont />
			<IsClicked />
			<Wrapper>
				<Children />
			</Wrapper>
		</div>
	);
}
