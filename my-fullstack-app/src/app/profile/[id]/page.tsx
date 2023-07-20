export default function userProfile({params}:any){
    return(
        <div className="bg-white min-h-screen">
            <h1>profile</h1>
            <p>profile page of - 
                <span className="p-2 rounded bg-black text-white">{params.id}</span>
            </p>
        </div>
    )
}