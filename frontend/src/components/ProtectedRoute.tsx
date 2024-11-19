// import {Navigate, Outlet} from "react-router-dom";
//
// type ProtectedRouteProps = {
//     user: string | undefined
// }
//
// export default function ProtectedRoute(props: ProtectedRouteProps) {
//     const istAuthenticated = props.user != undefined && props.user != "anonymousUser";
//
//
//     return (
//         <>
//             istAuthenticated ? <Outlet/> : <Navigate to={"/"} />
//         </>
//     );
// }