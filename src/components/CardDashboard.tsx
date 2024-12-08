interface ICardDasboardProps {
  title: string;
  value: string | number;
}

const CardDasboard = ({ title, value }: ICardDasboardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <h2 className="text-lg font-semibold text-primary-dark mb-2">{title}</h2>
    <h2 className="text-2xl font-bold text-primary-dark">{value}</h2>
  </div>
);

export default CardDasboard;