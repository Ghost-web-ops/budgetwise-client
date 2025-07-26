export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="flex flex-col items-center justify-center p-4 bg-gray-800 text-white">
            <p className="text-sm">
                &copy; {year} My Company. All rights reserved.
            </p>
        </footer>
    ); 
}