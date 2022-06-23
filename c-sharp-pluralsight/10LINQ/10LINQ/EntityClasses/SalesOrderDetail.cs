using System.Text;

namespace _10LINQ.ViewModelClasses
{
    public class SalesOrderDetail
    {
        public int SalesOrderID { get; set; }
        public short OrderQty { get; set; }
        public int ProductID { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal LineTotal { get; set; }

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder(1024);

            sb.AppendLine($"Order ID: {SalesOrderID}");
            sb.Append($"   Product ID: {ProductID}");
            sb.AppendLine($"   Qty: {OrderQty}");
            sb.Append($"   Unit Price: {UnitPrice:c}");
            sb.AppendLine($"   Total: {LineTotal:c}");

            return sb.ToString();
        }
    }
}