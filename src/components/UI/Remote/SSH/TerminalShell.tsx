// import { useXTerm } from 'react-xtermjs';
// import './TerminalShell.css'
// import { FC, useEffect, useRef, useState } from 'react';
// import '../../../lib/api';
// // import useSSHConnContext from '../../../hooks/useSSHConnect';
// import { wsSSHhostConnect } from '../../../../lib/api/sshService';


// // interface TerminalShellProps {
// //     id: number
// //     hostname: string
// //     connect: boolean
// // }

// function processLine(line: string) {
//     const promptRegex = /^\S+@\S+:\S+#\n$/;
//     return promptRegex.test(line) ? line.replace(/\n$/, '') : line;
// }

// const TerminalShell: FC = () => {
//     const { instance, ref } = useXTerm();
//     const inputRef = useRef('');
//     // const {selectedSSHConn} = useSSHConnContext()
//     const [history, setHistory] = useState<string[]>([])

//     useEffect(() => {

//         if (instance) {
//             instance.options = {
//                 theme: {
//                     background: 'rgba(0,0,0,0)',
//                     foreground: '#ffffff',
//                     cursor: 'block',
//                 },
//                 fontSize: 16,
//                 fontFamily: 'monospace',
//                 disableStdin: false,
//             };
//         }

//         if (false) {

//         const ws = null;

//         const sendCommand = (command: string) => {
//             if (ws && ws.State() === WebSocket.OPEN) {
//                 const jsonMessage = {
//                     command: command,
//                 };
//                 ws.PushMessageJSON(jsonMessage);
//             } else {
//                 instance?.write("WebSocket is not open or available.");
//             }
//         };

//         ws.AddReaction('message', (event: MessageEvent) => {
//             const data = event.data;
//             if (instance) {
//                 instance.write(processLine(atob(data)));
//             }
//         });

//         instance?.onData((data) => {
//             if (data === '\r') {
//                 sendCommand(inputRef.current);
//                 inputRef.current = '';
//                 instance?.writeln("");
//             } else if (data === '\x7F') {
//                 if (inputRef.current.length > 0) {
//                     inputRef.current = inputRef.current.slice(0, -1);
//                     instance?.write('\b \b');
//                 }
//             } else {
//                 inputRef.current += data;
//                 instance?.write(data);
//             }
//         });

//         return () => {
//             ws.CloseWS();
//         };
//         }
//     }, [instance, selectedSSHConn.id]);

//     return (
//         <div className='TerminalShell'>
//             <h1 className='TerminalShell_title'>SSH: {selectedSSHConn.hostname}</h1>
//             <hr />
//             <div className='Shell' ref={ref} ></div>
//         </div>
//     );
// };

// export default TerminalShell;