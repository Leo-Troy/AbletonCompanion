<template>
    <div class="license">
        License and Terms of Use Agreement<br><br>

Last Updated: 21/10/2023<br><br>

PLEASE CAREFULLY READ THE FOLLOWING TERMS AND CONDITIONS BEFORE USING OUR APPLICATION. YOUR USE OF THE APPLICATION IMPLIES YOUR ACCEPTANCE OF THESE TERMS AND CONDITIONS.<br><br>

License of Use<br><br>

1.1. Purpose of the License: AbletonCompanion (hereinafter referred to as "the Application") is licensed to the end user (hereinafter referred to as "the User") by Léo Troy (hereinafter referred to as "the License Holder") in accordance with the terms and conditions set forth in this License and Terms of Use Agreement (hereinafter referred to as "the Agreement").<br><br>

1.2. Personal Use: The User acknowledges that the Application is intended solely for personal use. The User is not authorized to resell, redistribute, or transfer the Application to third parties, whether for commercial or non-commercial purposes.<br><br>

Usage Restrictions<br><br>

2.1. The User may not, and may not authorize a third party to:<br><br>

a) Copy, modify, or create derivative works of the Application.<br>
b) Distribute, sell, sublicense, or transfer the Application to third parties.<br>
c) Attempt to circumvent, disable, or interfere in any way with the Application's security measures.<br>
d) Use the Application in violation of applicable laws or the intellectual property rights of the License Holder or third parties.<br><br>

Intellectual Property Rights<br><br>

3.1. The User acknowledges that the Application and all associated intellectual property rights remain the exclusive property of the License Holder. The User does not acquire any ownership rights to the Application, except for the usage rights expressly granted in this Agreement.<br><br>

Termination<br><br>

4.1. The License Holder reserves the right to terminate this license at any time in the event of the User's violation of the terms and conditions of this Agreement.<br><br>

General Provisions<br><br>

5.1. Entire Agreement: This Agreement constitutes the entire agreement between the License Holder and the User regarding the Application and supersedes all prior or contemporaneous agreements.<br><br>

5.2. Applicable Law: This Agreement is governed by the laws of France, without regard to conflict of laws principles.<br><br>

5.3. Contact: For any questions or concerns regarding this Agreement, please contact us at the following address: leo.troy.pro@gmail.com.<br><br>

BY ACCEPTING THESE TERMS AND CONDITIONS, THE USER ACKNOWLEDGES THAT THEY HAVE READ, UNDERSTOOD, AND AGREED TO BE BOUND BY THE TERMS OF THIS LICENSE AND TERMS OF USE AGREEMENT.
<div class="accept-button" @click="accept">
    J'accepte
</div>
    </div>
</template>

<script>
import Const from '@/app/main/Const';


    export default {
        name: 'LicenseComponent',
        components: {},
        props: { filter_option: Object },
        data() {
            return {

            }
        },
        methods: {
            accept() {
                Const.license_accepted = true;
                this.filter_option.current_view = 4
                // this.$emit("force-update")
            }
        }
    }

</script>

<style scoped>
    .license {
        color: var(--dark-color);
        font-size: var(--normal-font-size);
    }

    .accept-button {
        background-color: blue;
        color: white;
        padding: 2px 20px;
        width: 100px;
        margin-top: 10px;
        cursor: pointer;
    }
</style>