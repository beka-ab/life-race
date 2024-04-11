interface paginationProps {
  carPerPage: number;
  totalCars: number;
}

const Pagination: React.FC<paginationProps> = ({ carPerPage, totalCars }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCars / carPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a href="!#" />
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
