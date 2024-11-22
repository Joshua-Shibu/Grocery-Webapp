import { Oval as Loader } from "react-loader-spinner";
const LoaderSpinner = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader color="#00BFFF" height={100} width={100} />
    </div>
)

export default LoaderSpinner