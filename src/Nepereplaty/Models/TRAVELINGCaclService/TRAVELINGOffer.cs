﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.TRAVELINGCaclService
{
    public class TRAVELINGOffer
    {
        public InsuracneCompany Company { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public AdditionalOption[] AdditionalOptions { get; set; }
        public string Description { get; set; }
        public bool IsShown { get; set; }

        public float Total_SS { get; set; }
        public float Total_SP { get; set; }
        public float Damage_SP { get; set; }
        public float Liquid_Spill_SP { get; set; }
        public float Luxury_SP { get; set; }
        public float Dop_Total_SP { get; set; }

    }


    public class AdditionalOption
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}

