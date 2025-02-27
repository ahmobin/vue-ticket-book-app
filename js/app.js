const { createApp } = Vue;

createApp({
    data(){
        return {
            seatStates: {
                sold: {
                    text: "Sold",
                    color: "#ff0000"
                },
                available: {
                    text: "Available",
                    color: "#fff"
                },
                booked: {
                    text: "Booked",
                    color: "grey"
                },
                selected: {
                    text: "Selected",
                    color: "#00ff00"
                }
            },

            seats: [
                {
                  name: "A1",
                  type: "available",
                  price: 500
                },
                {
                  name: "A2",
                  type: "available",
                  price: 500
                },
                {
                  name: "A3",
                  type: "available",
                  price: 500
                },
                {
                  name: "A4",
                  type: "available",
                  price: 500
                },
                {
                  name: "B1",
                  type: "available",
                  price: 450
                },
                {
                  name: "B2",
                  type: "available",
                  price: 450
                },
                {
                  name: "B3",
                  type: "available",
                  price: 450
                },
                {
                  name: "B4",
                  type: "available",
                  price: 450
                },
                {
                  name: "C1",
                  type: "sold",
                  price: 500
                },
                {
                  name: "C2",
                  type: "sold",
                  price: 500
                },
                {
                  name: "C3",
                  type: "sold",
                  price: 500
                },
                {
                  name: "C4",
                  type: "sold",
                  price: 500
                },
                {
                  name: "D1",
                  type: "available",
                  price: 400
                },
                {
                  name: "D2",
                  type: "available",
                  price: 400
                },
                {
                  name: "D3",
                  type: "available",
                  price: 400
                },
                {
                  name: "D4",
                  type: "available",
                  price: 400
                },
                {
                  name: "E1",
                  type: "available",
                  price: 300
                },
                {
                  name: "E2",
                  type: "available",
                  price: 300
                },
                {
                  name: "E3",
                  type: "booked",
                  price: 300
                },
                {
                  name: "E4",
                  type: "booked",
                  price: 300
                },
                {
                  name: "F1",
                  type: "available",
                  price: 300
                },
                {
                  name: "F2",
                  type: "available",
                  price: 300
                },
                {
                  name: "F3",
                  type: "available",
                  price: 300
                },
                {
                  name: "F4",
                  type: "available",
                  price: 300
                }
              ],

          appliedCoupon: null,
          couponCode: "",
          coupons: [
            {
              code: "100TAKAOFF",
              discount: 100
            },
            {
              code: "200TAKAOFF",
              discount: 200
            }
          ],
          name: "",
          mobile: "",
          confirmed: false
        }
    },

    computed: {
      selectedSeats(){
        return this.seats.filter((item) => item.type == 'selected');
      },

      totalCost(){
        let totalCost = 0;
        this.selectedSeats.forEach(seat => {
          totalCost += seat.price;
        });
        if(this.appliedCoupon != null){
          totalCost -= this.appliedCoupon.discount;
        }
        return totalCost;
      }
    },

    methods: {
        handleClick(i){
            let clickedSeat = this.seats[i];
            if(clickedSeat.type == 'sold' || clickedSeat.type == 'booked'){
              alert('You cannot select the seat');
              return;
            }

            if(clickedSeat.type == 'available' && this.selectedSeats.length >= 3){
              alert('You cannot select more than 3 seat');
              return;

            }

            clickedSeat.type = clickedSeat.type == 'selected' ? 'available' : 'selected';
        },

        confirm(){
          if(!this.name || !this.mobile){
            alert("please enter name and mobile number");
            return;
          }
          this.confirmed = true;
        },

        resetData(){
          this.confirmed = false;
          this.name = "",
          this.mobile = "",
          this.appliedCoupon = null;
          this.seats.forEach((seat) => {
            if(seat.type == 'selected'){
              seat.type = 'sold';
            }
          })
        }
    },

    watch: {
      couponCode(code){
        if(code.length == 10){
          let searchedCoupons = this.coupons.filter((item) => item.code == code);
          if(searchedCoupons.length == 1){
            this.appliedCoupon = searchedCoupons[0];
            this.couponCode = "";
          }else{
            alert("Coupon not valid")
          }
        }
      }
    }

}).mount('#app')