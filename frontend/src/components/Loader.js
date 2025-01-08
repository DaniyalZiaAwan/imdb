
const Loader = ({ colorClass = 'border-blue-500' }) => {
    return (
        <div class="flex justify-center items-center">
            <div class={`animate-spin rounded-full h-12 w-12 border-t-4 ${colorClass} border-opacity-75`}></div>
        </div>
    )
}

export default Loader;