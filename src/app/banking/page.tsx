import { BalanceStatistics } from "./BalanceStatistics";
import ContactsList from "./ContactsList";
import ExpenseCategories from "./ExpensesCategories";
import IncomesExpenses from "./IncomesExpenses";
import { InviteFriend } from "./InviteFriend";
import RecentTransactions from "./RecentTransactions";

export default function BankingPage() {
  return (
    <section className="flex items-center gap-6 p-8">
      <aside className="w-2/3 space-y-6">
        <IncomesExpenses />

        <BalanceStatistics />

        <ExpenseCategories />

        <RecentTransactions />
      </aside>

      <aside className="w-1/3 space-y-6">
        <ContactsList />

        <InviteFriend />
      </aside>
    </section>
  );
}
