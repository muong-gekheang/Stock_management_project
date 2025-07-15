function Button({name, bgColor}) {
    return (
       <button
            className="text-white font-bold py-2 px-2 rounded-full w-3xs hover:shadow-lg hover:shadow-gray-400 hover:shadow-md transition duration-300 ease-in-out"    
            style={{ backgroundColor: bgColor }}
        >
            {name}
        </button>
    );
}
export default Button;