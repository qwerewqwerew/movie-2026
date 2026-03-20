<div className="grid auto-rows-auto grid-cols-2 md:grid-cols-4  gap-10">
  {now.map((el) => (
    // 카드시작
   <div key={el.id} className="py-10">
      <Link to={`movie/${el.id}`}>
        <img className="object-cover w-full h-full" src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt="" />
        {el.original_title}
      </Link>
    </div>

    // 카드끝
  ))}
</div>