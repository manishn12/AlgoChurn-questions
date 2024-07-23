import React, { useState, useEffect } from 'react';

const List = ({ classname, item }) => {
  return <li className={classname}>{item}</li>;
};

export const Document = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [activeItems, setActiveItems] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVal = input.trim();
    const id = Date.now();
    if (newVal) {
      setData((prev) => [{ text: newVal, id }, ...prev]);
      setActiveItems((prev) => ({ ...prev, [id]: true }));

      setTimeout(() => {
        setActiveItems((prev) => ({ ...prev, [id]: false }));
      }, 3000);
    }
    setInput('');
  };

  return (
    <div className="div-container">
      <form>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
      </form>
      <div className="doc-container">
        <ul>
          {data.map((item) => {
            return (
              <List
                key={item.id}
                item={item.text}
                classname={`li ${activeItems[item.id] ? 'active' : ''}`}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
