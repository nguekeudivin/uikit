import { BalanceStatistics } from "./BalanceStatistics";
import ContactsList from "./ContactsList";
import CreditCards from "./CreditCards";
import ExpenseCategories from "./ExpensesCategories";
import IncomesExpenses from "./IncomesExpenses";
import { InviteFriend } from "./InviteFriend";
import QuickTransfert from "./QuickTransfert";
import RecentTransactions from "./RecentTransactions";

export default function BankingPage() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      <aside className="col-span-1 md:col-span-2 space-y-6">
        <IncomesExpenses />

        <BalanceStatistics />

        <ExpenseCategories />

        <RecentTransactions />
      </aside>

      <aside className="col-span-1 space-y-6">
        <CreditCards />

        <QuickTransfert />

        <ContactsList />

        <InviteFriend />
      </aside>
    </section>
  );
}
