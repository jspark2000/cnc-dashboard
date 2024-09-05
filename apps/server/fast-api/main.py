import psycopg

with psycopg.connect(
    "host=192.168.30.211 port=5432 dbname=cnc user=crois password=crois"
) as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM model_evaluation ORDER BY id DESC LIMIT 10")

        for record in cur.fetchall():
            print(record)

        conn.close()
