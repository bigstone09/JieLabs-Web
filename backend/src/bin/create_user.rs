use backend;
use dotenv::dotenv;
use diesel::prelude::*;
use structopt::StructOpt;

#[derive(StructOpt)]
struct Args {
    #[structopt(short, long)]
    user_name: String,

    #[structopt(short, long)]
    password: String,

    #[structopt(short, long)]
    real_name: Option<String>,

    #[structopt(short, long)]
    student_id: Option<String>,

    #[structopt(short, long)]
    class: Option<String>,
}

#[paw::main]
fn main(args: Args) {
    dotenv().ok();
    let url = std::env::var("DATABASE_URL").expect("DATABASE_URL");
    let conn = backend::DbConnection::establish(&url).expect("connect");

    let new_user = backend::models::NewUser {
        user_name: args.user_name,
        password: backend::users::hash_password(&args.password),
        real_name: args.real_name,
        student_id: args.student_id,
        class: args.class,
    };
    diesel::insert_into(backend::schema::users::table)
        .values(&new_user)
        .execute(&conn)
        .expect("insert should not fail");
}