function OptionItem({ collection, onClick }) {
    return (
        <div
            className="collection-item"
            style={{ padding: "10px" }}
            onClick={() => onClick(collection)}
        >
            <img
                src={collection.image}
                alt={collection.name}
                style={{ width: "100%", height: "auto", cursor: "pointer" }}
            />
            <p style={{ textAlign: "center" }}>{collection.name}</p>
        </div>
    );
}

export default OptionItem;
