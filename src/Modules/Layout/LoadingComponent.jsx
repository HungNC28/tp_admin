const LoadingComponent = () => {
    return <div className="Loading">
        <section className="card-container">
            <article className="card skeleton">
                <div className="card-image"></div>
                <div className="card-content">
                    <div className="card-title"></div>
                    <p className="card-text"></p>
                </div>
            </article>
        </section>
    </div>
}

export default LoadingComponent