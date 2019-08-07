const { localStorage } =window;

export function addItem (key,value) {
    localStorage.setItem(key,value)
}

export function getItem (key) {
    const value = localStorage.getItem(key);
    return value || null;
}

export function removeItem(key) {
    localStorage.removeItem(key);
}

export function clearItem() {
    localStorage.clear();
}