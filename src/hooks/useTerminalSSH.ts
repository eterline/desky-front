import { useEffect, useRef, useState, useCallback } from "react";
import { useXTerm } from "react-xtermjs";
import { wsSSHhostConnect } from "../lib/api/sshService";

const setupInstance = () => ({
    theme: {
        background: "rgba(0,0,0,0)",
        foreground: "#ffffff",
        cursor: "block",
    },
    fontSize: 16,
    fontFamily: "monospace",
    disableStdin: false,
});

function processLine(line: string) {
    const promptRegex = /^\S+@\S+:\S+#\n$/;
    return promptRegex.test(line) ? line.replace(/\n$/, '') : line;
}

const useTerminalSSH = (id: number) => {
    const { instance, ref } = useXTerm();
    const terminalInput = useRef<string>("");
    const [cliHistory, setCliHistory] = useState<string[]>([]);
    const wsRef = useRef<any>(null);

    useEffect(() => {
        if (!instance) return;

        instance.options = setupInstance();
        wsRef.current = wsSSHhostConnect(id);

        const ws = wsRef.current;

        const sendCommand = (command: string) => {
            if (ws && ws.State() === WebSocket.OPEN) {
                ws.PushMessageJSON({ command });
            } else {
                instance.write("\r\n[Error]: WebSocket is not connected.\r\n");
            }
        };

        ws.AddReaction("message", (event: MessageEvent) => {
            const data = event.data;
            instance?.write(processLine(atob(data)));
        });

        instance.onData((data) => {
            if (data === "\r") {
                sendCommand(terminalInput.current);
                setCliHistory((prev) => [...prev, terminalInput.current]);
                terminalInput.current = "";
                instance.writeln("");
            } else if (data === "\x7F") {
                if (terminalInput.current.length > 0) {
                    terminalInput.current = terminalInput.current.slice(0, -1);
                    instance.write("\b \b");
                }
            } else {
                terminalInput.current += data;
                instance.write(data);
            }
        });

        return () => {
            ws.CloseWS();
        };
    }, [instance, id]);

    // Функция для отключения терминала
    const disconnect = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.CloseWS();
            wsRef.current = null;
        }
        instance?.dispose();
    }, [instance]);

    return { ref, instance, disconnect };
};

export default useTerminalSSH;
