export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="flex flex-col dark:bg-gray-800 items-center justify-center p-4 bg-white text-white">
            <p className="text-sm dark:text-gray-400 text-gray-500">
                &copy; {year} My Company. All rights reserved.
            </p>
        </footer>
    ); 
}