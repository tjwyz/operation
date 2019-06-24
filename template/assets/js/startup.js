export default function startup() {
	// 右键禁止
    document.oncontextmenu = function (e) {
        e.preventDefault();

        return false;
    };
}