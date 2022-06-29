import {Data} from "./api/hello";

export default function FirstPost({ res_data }) {
    return (
        <h1>{res_data.name}</h1>

    )
}

export async function getServerSideProps() {
    const response = await fetch('http://localhost:3000/api/hello')
    const res_data: Data = await response.json()
  
    return { props: { res_data } }
}