export const log = async (url: string, method: string) => {
const t = new Date().toISOString();

console.log("log", {
url,
method,
time: t
});
};
