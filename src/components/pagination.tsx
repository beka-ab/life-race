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
  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              onClick={() => {
                paginate(number);

                console.log("pagination clikced");
              }}
              href="!#"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
