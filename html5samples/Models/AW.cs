namespace TestVarie.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class AW : DbContext
    {
        public AW()
            : base("name=AW")
        {
        }

        public virtual DbSet<CountryRegion> CountryRegions { get; set; }
        public virtual DbSet<StateProvince> StateProvinces { get; set; }

  
    }
}
