import { useCallback, useMemo } from "react";
import { useCookies } from "react-cookie";

export const useTiming = (name: string) => {
	const [cookies, setCookie] = useCookies([name]);

	const isExpired = useCallback(() => {
		return cookies[name] == undefined;
	}, []);

	const setExpiration = useCallback((frequency: number) => {
		const expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + frequency);
		setCookie(name, "true", { expires: expirationDate, path: "/", sameSite: "lax" });
	}, []);

	return useMemo(() => ({isExpired, setExpiration}), [isExpired, setExpiration]);
}