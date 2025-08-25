import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, seteNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()_-";

    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  const passwordRef = useRef(null)

  const copyPasswordtoClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }

  return (
    <div className="sm:w-full max-w-md shadow-lg rounded-lg px-4 py-3 my-8 bg-gray-900 text-amber-50 sm:mx-auto mt-40 overflow-auto mx-2.5 md:mx-auto">
      <h1 className="text-white text-center my-3 text-3xl">Password Generator</h1>
      <div className="flex shadow overflow-hidden rounded-lg mb-4">
        <input
          className="text-black bg-white outline-none w-full py-1 px-3"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
          type="text"
        />

        <button onClick={copyPasswordtoClipboard} className="cursor-pointer outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          Copy
        </button>
      </div>
      
      <div className="flex flex-col gap-3 p-2 md:flex-row text-sm gap-x-5">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            name=""
            id=""
            min={6}
            max={100}
            value={length}
            className="cursor-pointer scale-120 sm:scale-100 sm:mr-1 mr-5 ml-2 sm:ml-0"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultValue={numberAllowed}
            onChange={() => {
              seteNumberAllowed((prev) => !prev);
            }}
            style={{ cursor: "pointer" }}
            className="scale-150 mr-1 sm:scale-100"
          />
          <label htmlFor="number">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultValue={charAllowed}
            onChange={() => {
              setcharAllowed((prev) => !prev);
            }}
            style={{ cursor: "pointer" }}
            className="scale-150 mr-1 sm:scale-100"
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
