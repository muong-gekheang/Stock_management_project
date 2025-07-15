function Header ({title }) {
    return (
        <>
            <div className="flex flex-col justify-center gap-4">
                <div className="flex flex-row justify-between items-center gap-6 pl-4 pr-4" >
                    <img className="w-12 h-12" src="../src/assets/menu.png" alt="Menu" />
                    <p className="justify-center text-center font-bold text-[#6E53AB] text-5xl m-5">{title}</p>
                    <div className="flex flex-row gap-10 pr-4 items-center">  
                        <img className="w-12 h-12" src="../src/assets/search.png" alt="Search" />
                        <img className="w-14 h-14" src="../src/assets/profile.png" alt="Profile" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;