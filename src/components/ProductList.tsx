import { useEffect, useState } from "react"

export default function ProductList({category}:{category:string}) {
  const [products,setProducts]=useState<string[]>([]);
  useEffect(()=>{
    console.log("Fetching Products in ",category);
    setProducts(['Product 1','Product 2'])
  },[category])
  return (
    <div>
        Product List
    </div>
  )
}
