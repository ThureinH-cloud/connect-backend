import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";

export default function App() {
  // const [category,setCategory]=useState('');
  // const formRef = useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   if (formRef.current) {
  //     formRef.current.focus();
  //   }
  // });
  // useEffect(() => {
  //   document.title = "My App";
  // });
  interface User {
    id: number;
    name: string;
  }
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((error) => setError(error.message))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const onDelete=(id:number)=>{
    setUsers(users.filter((user:User)=>user.id !== id));
    axios.delete(`https://jsonplaceholder.typicode.com/users+${id}`)
    .catch(error => {
      setError(error.message);
      setUsers([...users]);
    });

  }
  return (
    <div>
      {/* <form action="">
        <input ref={formRef} type="text" className="form-control" />
      </form> */}
      {/* <div style={{maxWidth:300,padding:20}}>
        <select onChange={(e)=>setCategory(e.target.value)} name="" className="form-select" id="">
          <option value=""></option>
          <option value="Clothes">Clothes</option>
          <option value="Household">Household</option>
        </select>
      </div>
      <ProductList category={category}  /> */}
      {error && <p>{error}</p>}
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <div style={{maxWidth:300,margin:20}}>
        <ul className="list-group">
          {users.map((user) => (
            <li className="list-group-item d-flex justify-content-between" key={user.id}>
              {user.name}
              <button onClick={()=>onDelete(user.id)} className="btn btn-outline-danger">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
