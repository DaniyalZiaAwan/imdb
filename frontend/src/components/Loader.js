
const Loader = ({ colorClass = 'border-blue-500' }) => {
    return (
        <div class="flex justify-center items-center">
            <div class={`animate-spin rounded-full h-12 w-12 border-t-4 border-opacity-75m${colorClass}`} />
        </div>
    )
}

export default Loader;