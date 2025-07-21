function InputBox({ label, value, placeHolder, onChange}) {
    return (
        <div className="flex flex-col">
            <label className="mb-2 font-medium">{label}</label>
            <input
                className="bg-[#F5F5F5] border-0 p-2 rounded-lg"
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeHolder}
            />
        </div>
    );
}

export default InputBox;
