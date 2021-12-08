import Card from "../components/Card";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeValue,
  onAddToFavorite,
  onAddToCard
}) {
  return (
    <div className="content p-40">

      <div className="d-flex align-center mb-40 justify-between">
        <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Close" />}
          <input onChange={onChangeValue} value={searchValue} type="text" placeholder="Поиск..." />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items
          .filter(item => item.title.toLowerCase().includes(searchValue))
          .map((item, title) => (
            <Card
              key={title}
              onFavorite={obj => onAddToFavorite(obj)}
              onPlus={obj => onAddToCard(obj)}
              {...item}
            />
          ))}
      </div>

    </div>
  )
}

export default Home;