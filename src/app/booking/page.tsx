import BookingCaroussel from "./BookingCaroussel";
import BookingDetails from "./BookingDetails";
import BookingMainStats from "./BookingMainStats";
import { BookingStatistics } from "./BookingStatistics";
import CustomerReviews from "./CustomerReviews";
import TotalIncomes from "./TotalIncomes";
import ToursAvailable from "./ToursAvailable";

export default function BankingPage() {
  return (
    <div className="bg-gray-50/50 p-8 pt-0">
      <div>
        <BookingMainStats />
      </div>

      <section className="grid grid-cols-3 gap-6 mt-8">
        <div className="col-span-2">
          <TotalIncomes />
        </div>
        <div>
          <ToursAvailable />
        </div>
        <div className="col-span-2">
          <BookingStatistics />
        </div>
        <div>
          <CustomerReviews />
        </div>
      </section>

      <section className="space-y-12 mt-12">
        <BookingCaroussel />

        <BookingDetails />
      </section>
    </div>
  );
}
