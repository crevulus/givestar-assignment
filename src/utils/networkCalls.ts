export const fetchForces = async () => {
    const res = await fetch("https://data.police.uk/api/forces");
    return res.json();
};

export const fetchForce = async (id: string | undefined) => {
    if (!id) {
        return;
    }
    
    const res = await fetch(`https://data.police.uk/api/forces/${id}`);
    return res.json();
}