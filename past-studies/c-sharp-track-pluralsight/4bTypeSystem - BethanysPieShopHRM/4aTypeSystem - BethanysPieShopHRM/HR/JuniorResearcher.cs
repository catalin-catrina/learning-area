using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BethanysPieShopHRM.HR
{
    public class JuniorResearcher : Researcher
    {
        public JuniorResearcher(int id, string first, string last, string mail, DateTime bd, double? rate) : base(id, first, last, mail, bd, rate) { }
    }
}
