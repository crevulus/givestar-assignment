export const fetchForces = async () => {
    const res = await fetch("https://data.police.uk/api/forces");
    return res.json();
};