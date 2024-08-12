import { useEffect, useState } from "react";
import axios from "axios";
import Tables from "../../UI/Tables";
import SearchUi from "../../UI/SearchUi";

const transactionHeader = [
  { id: "1", title: "id" },
  { id: "2", title: "Fname" },
  { id: "3", title: "Lname" },
  { id: "4", title: "email" },
  { id: "5", title: "userId" },
  { id: "6", title: "group id" },
  { id: "7", title: "round" },
  { id: "8", title: "status" },
  { id: "9", title: "amount" },
  { id: "10", title: "currency" },
  { id: "12", title: "reference" },
  { id: "13", title: "tx_ref" },
  { id: "14", title: "verifiedAt" },
];

interface endpoint {
  urll: string;
  user_id: string;
  isSearch?: boolean;
}

const UserTransaction = ({ urll, user_id, isSearch }: endpoint) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(urll);

        const filteredProperties = [
          "_id",
          "fname",
          "lname",
          "email",
          "user",
          "equbGroup",
          "round",
          "status",
          "amount",
          "currency",
          "reference",
          "tx_ref",
          "verified_at",
        ];

        // Extract only the required properties from the response data
        const filteredTransactionData = response.data.map(
          (transaction: { [key: string]: any }) => {
            const filteredTransaction: { [key: string]: any } = {}; // Type explicit declaration
            filteredProperties.forEach((property: string) => {
              if (transaction.hasOwnProperty(property)) {
                filteredTransaction[property] = transaction[property];
              }
            });
            return filteredTransaction;
          }
        );

        // Set the filtered transaction data
        setTransactions(filteredTransactionData);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    if (user_id) {
      fetchTransaction();
    }
  }, [user_id, urll]);

  const handleSearch = (searchTerm: string) => {
    const filteredResults = transactions.filter((transaction: any) =>
      Object.values(transaction).some((value: any) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredTransactions(filteredResults);
  };

  return (
    <div className="container justify-center mx-auto mt-3">
      <div className="flex flex-col space-y-5 justify-start">
        {isSearch && <SearchUi handleSearch={handleSearch} search="fname" />}
        <Tables
          header={transactionHeader}
          datas={
            filteredTransactions.length > 0
              ? filteredTransactions
              : transactions
          }
          hasDelete={false} // Pass the boolean prop indicating delete button visibility
          onDelete={() => {}}
        />
      </div>
    </div>
  );
};

export default UserTransaction;
