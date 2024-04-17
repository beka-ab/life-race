interface paginationProps {
  carPerPage: number;
  totalCars: number;
  paginate: (numeber: number) => void;
}

const Pagination: React.FC<paginationProps> = ({
  carPerPage,
  totalCars,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCars / carPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleClick = (
    pageNumber: number,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    paginate(pageNumber);
  };
  return (
    <nav className="pagination-bar">
      <ul className="pagination-list">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a href="!#" onClick={(e) => handleClick(number, e)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
